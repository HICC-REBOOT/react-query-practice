# 개발환경 설명

## prettier 설정
+ printWidth: 한 줄의 최대 길이 120자 제한
+ useTabs: 탭 문자를 사용하지 않습니다. 저장하면 자동으로 스페이스 2번으로 변환됨
+ tabWidth: 들여쓰기 길이를 2로 설정
+ singleQuote: 문자열을 큰 따옴표로 표시
+ trailingComma: 객체나 배열의 마지막 요소에 항상 쉼표
+ semi: 문장 끝에 세미콜론을 항상 사용함
+ arrowParens: 화살표 함수에서 모든 인자는 괄호가 포함된다.

## src 폴더구조 설명
+ assets: 프로젝트에서 필요한 파일들을 모아두는 곳
+ components: 페이지에서 반복적으로 사용될 컴포넌트를 모아두는 곳
+ constants: 상수의 값을 저장해놓는 곳
+ functions: 자주 사용되는 유용한 함수들을 모아두는 곳
+ hooks: 커스텀 훅을 모아두는 곳
+ libs: 라이브러리 관련 파일을 모아두는 곳 (recoil store)
+ mocks: 가짜 서버 관련해서 모아두는 곳
+ pages: 우리 서비스에서 필요한 페이지
+ query: react-query에서 사용할 query들을 모아두는 곳 (get, post, patch, delete 폴더들이 들어갈 예정, 각 메서드별로 모아두면 된다.)
+ styles: font, globaltheme, theme를 정의해둔 곳
+ utils: 유용하게 사용할 수 있는 기능을 모아두는 곳
+ App.tsx: 우리 서비스의 앱, 라우트가 여기에 위치
+ index.tsx: 글로벌 스타일, 테마, 쿼리, 리코일 루트를 index.js에 선언해둠으로써 App안에서 이들을 사용할 수 있게 설정

## 기타 파일 설명
+ public: index.html이 존재
  - **mockServiceWorker.js**파일은 가짜 서버를 위한 설정파일이므로 가짜 서버를 사용하지 않을 때까지는 지우지 마세요

+ .env: (깃에 올라가지 않으니 직접 설정해주세요)
    ```
    REACT_APP_SERVER="http://localhost:8080"
    ```
+ .eslintrc: 코드 오류를 잡아주는 역할을 수행
+ .gitignore: 깃에 올리지 않을 파일, 디렉토리를 선언해주는 곳
+ .prettierrc: 코드 스타일, 컨벤션을 잡아주는 역할 수행, 내용에 대한 설명은 prettier 설정 참고
+ craco.config.ts: 절대 경로 설정을 하기 위해서 cra에 config 설정을 덮어쓴 패키지
+ package.json: react에서 사용하는 라이브러리를 모아두는 곳
  - 처음에 프로젝트를 클론한 후 터미널에 cd frontend를 입력한 후 npm i를 입력하면 package.json에 있는 라이브러리를 자동으로 설치
+ tsconfig.json: 타입스크립트를 자바스크립트로 변환 시키는 컴파일 설정을 한꺼번에 정의 해놓는 파일
+ tsconfig.paths.json: import를 절대경로로 하기 위해 각 경로를 정의해놓은 파일


## mocks server worker
+ react-query를 테스트해보기 위해서 사용했는데 실제로 개발시에 사용할지는 아직 모릅니다. 백엔드 개발속도가 빠르면 필요없어요!

+ 가짜 서버를 만들어 백엔드가 없어도 백엔드 연결 테스트를 해볼 수 있다.

+ client에서 axios 요청을 보내면 msw가 이를 가로채 미리 작성해둔 응답을 보내준다

### msw 폴더 구조
+ data: 더미 데이터를 구축해놓는 곳, js, json 어느 것을 사용해도 상관없다.
+ handlers: 응답 메시지를 정의해놓는 곳
+ handler 작성하는 요령
```js
// get, post, patch, delete 등 http method를 정한다.
// http://localhost:8080은 BASE_URL로 대체한다.
// endpoint 별로 작성할 수 있으며, BASE_URL뒤에 /로 시작하면 된다. 요청을 보낼때도 마찬가지

// 응답의 결과를 response 변수에 넣어 HttpResponse.json(response)형태로 돌려주면 된다.
// 각 핸들러들은 배열로 저장한다

// http 안에는 get, post, put, delete, patch의 http method가 존재
// 아래와 같이 요청을 날리면 된다.

http.get(`${BASE_URL}/api/user`, () => {
    const response = setResponse(user);
    return HttpResponse.json(response);
  }),

// 예시 하나 더 pagination일 때
http.get(`${BASE_URL}/api/user/page`, async ({ request }) => {
    const queryParams = new URLSearchParams(new URL(request.url).search);

    const page = Number(queryParams.get('page'));
    const size = Number(queryParams.get('size'));

    const pageItem = () => {
      return user.slice(page * size, (page + 1) * size);
    };

    const response = setResponse({
      totalElements: user.length,
      data: pageItem(),
    });

    // 요청을 1초 지연시키는 기법
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    return HttpResponse.json(response);
  }),
```

+ setResponse  
예상되는 응답의 형태
이는 백엔드의 응답 형태가 달라지면 달라지게 하면 된다.

```ts
interface IResponse<R> {
  timestamp: string;
  isSuccess: boolean;
  code: string;
  message: string;
  data: R;
}

const setResponse = <R>(data: R) => {
  const response: IResponse<R> = {
    timestamp: '2023-12-08',
    isSuccess: true,
    code: '200',
    message: '호출 성공',
    data,
  };

  return response;
};

export default setResponse;
```

+ 추가로 작성한 handler를 handler.js에서 스프레드 연산자로 추가해주면 된다.
+ 이렇게 작성해놓으면 특정 endpoint로 request를 보낼 때 등록한 응답이 돌아오게 된다.


## request (axios)
+ utils/axios.ts를 참고

+ 요청을 보낼 때 제네릭 타입을 3개 넣어주어야한다.
  - request body type (없을 경우 null)
  - response body type
  - request parameter type (없을 경우 null)

```ts
interface RequestBody {
  name: string
}

interface ResponseBody {
  id: number
}

interface RequestParams {
  size: number
}

// get
const size = 6;

const fetchData = async () => {
  const response = await request<null, ResponseBody, RequestParams>({
    uri: '/api/hello/',
    method: 'get',
    params: {
      size,
    }
  });

  return response.data.id;
}

// post
const body = {name: 'jinokim'};
const size = 6;

const fetchData = async () => {
  const response = await request<RequestBody, ResponseBody, RequestParams>({
    uri: '/api/hello/',
    method: 'post',
    data: body,
    params: {
      size,
    }
  });

  return response.data.id;
}
```

이와 같이 요청을 보내면 됩니다.

## react-query

+ 이번 프로젝트에서는 단순 axios를 사용한 통신이 아니라 react-query를 부가적으로 사용합니다.
+ 그 이유는 isLoading, error 등등 여러 가지 편의성 기능의 제공도 있지만 가장 큰 이유는 캐싱 기능
+ 같은 정보를 여러 번 불러와 서버를 부하시키는 일을 벌리지 않기 위해서이며, 이 때문에 react-query를 활용한다고 알고 있으면 되겠습니다.


### 초기 셋팅

```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
    },
  },
});

<QueryClientProvider client={queryClient}>
  <App />
  <ReactQueryDevtools initialIsOpen={true} />
</QueryClientProvider>
```

+ queryClient를 생성한 후 디폴트 옵션으로 두 가지를 설정해줬는데 focus를 할 경우 (크롬 창 왔다갔다, f12 등) refetch 방지와 staleTime 두 가지이다. 추가적으로 필요한 것이 있다면 차후에 넣을 예정입니다.

staleTime은 캐싱한 데이터가 유효한 시간을 말하는데, 캐싱한 데이터가 staleTime이 지나지 않았다면, fresh한 상태인 캐싱데이터이므로 굳이 서버로부터 데이터를 다시 가져오지 않아도 된다는 의미입니다.


## react-query 사용법

### get

**@query/get/useGetUser.ts**를 참고하면 더 빠름

http method에서 get은 `useQuery`훅을 사용합니다.
useQuery 훅은 기본적으로 2개의 파라미터를 필요로합니다.

1. queryKey
  + 리코일과 동일하게 중복되지 않은 고유한 키 값을 넣어줘야합니다.
  + 여기에는 파리미터의 변동 또한 반영시켜 주어야하는데 queryKey의 type은 `string[]`임을 확인할 수 있습니다.
  + 따라서 변동되는 조건들을 배열로 넣어주면 **@query/get/useGetUserDetail.ts 참고** 각 파라미터 별로 고유한 키를 만들 수 있게 됩니다.

2. queryFn
  + 실행할 비동기함수
  + 말 그대로 서버에서 값을 가져오는 함수입니다.
  + 여기에서 utils에 있는 request 함수를 사용하면 됩니다.

3. 부가적으로...
  + select가 있는데 이는 서버에서 가져온 값을 잘라서 쓴다거나, 정렬을 한다거나하는 데이터를 가공하는 목적으로 사용할 수 있습니다.
  + 이거는 필요할 때 적절하게 사용하면 좋을 것 같습니다.


### post, put, delete, patch

http method에서 get 이외의 메서드는 `useMutation`훅을 사용합니다.
useMutation 훅은 기본적으로 2개의 파라미터를 필요로하며, 추가로 몇 가지를 더 알아야합니다.


1. mutationKey
  + useQuery의 키와 동일합니다.

2. mutationFn
  + 실행할 비동기함수
  + 말 그대로 서버에 값을 전달하여 서버의 데이터에 변동을 일으키는 함수입니다.
  + 여기에서 utils에 있는 request 함수를 사용하면 됩니다.

3. onSuccess
  + 요청이 성공했을 때 작동하는 함수
  + 예시에서는 patch 메서드를 사용했으며, 수정이 성공하면 수정된 데이터로 서버에서 다시 불러와야합니다.
  + 이 때 queryClient의 refetchQueries를 사용하면 해당 key에 대한 query를 fetch해올 수 있습니다.

4. onError
  + 요청이 실패했을 때 작동하는 함수
  + 요청이 실패했을 때 상태를 원복시키는 작업을 수행할 수 있습니다.


## react-query 함수 저장

@query 디렉토리 안에 각 http method별 디렉토리 안에 모아서 사용하시면 됩니다.


## import 할 때
상대경로로 import 하는 경우 ../../../../components/~~ 보기 좋지 않은 코드가 됩니다.
이를 방지하고자 절대경로를 사용하며, @가 앞에 붙는 것으로 설정을 해뒀습니다.

tsconfig.paths.json을 참고하면 되며 import할 때 상대경로 대신에 @가 붙는 절대경로를 이용해주세요.


## Component 생성 관련
컴포넌트를 만드는 함수는 function 키워드와 export default를 사용할 예정입니다. const로 생성하지 마세요...
그 내부 함수에 const를 쓰세요

이렇게 사용해주세요
```tsx
import React from 'react';

function Main() {

};

export default Main
```


이렇게 사용하지 말아달라는 얘기입니다.
```tsx
import React from 'react';

const main = () => {

};

export default Main

```

추가로 한 파일 안에는 한 컴포넌트 함수만 만들어주세요
이렇게 하지 말아달라는 의미입니다. 
```tsx
import React from 'react';

function Main() {

};

function Main2() {

}

export default Main
```


## styled-components 관련
styled-components를 사용할 때 이렇게 사용하지 말아주세요
style 폴더를 만들어서 그 안에 ~~.style.tsx 파일을 만들어서 사용해주세요.
이렇게 하는 이유는 export default가 파일 마지막으로 가기 위함입니다.

Main.tsx
```tsx
import React from 'react';
import styled from 'styled-components';

function Main() {

};

export default Main

const Container = styled.div``;
```


아래와 같이 사용해주세요.

./style/Main.style
```tsx
import styled from 'styled-components';

export const Container = styled.div``;
```

Main.tsx
```tsx
import React from 'react';
import * as M from './style/Main.style';

function Main() {

};

export default Main
```


## map 함수 안에 JSX.Element를 넣고 싶다면 Each~~ 파일을 생성해주세요
이렇게 하는 이유는 map 안의 컴포넌트 별로 상태를 가지고 있을 때 (ex: member name을 클릭 시 해당 member 색 변화)

위의 방식은 members의 전체를 알고 있어야하지만  
아래와 같이 구현하게되면 Each 안에 각각 state를 가질 수 있어 개발할 때 훨씬 편리할 것입니다.

아래 코드 예시를 보시면 차이점을 더 명확하게 아실 수 있을거라 생각합니다.

이렇게 작성하지 않습니다.
```tsx
interface Member {
  id: number
  name: string
  age: number
}

function Main() {
  const members: Member[] = [
    {
      id: 1,
      name: 'jinhokim',
      age: 26,
    },
    {
      id: 2,
      name: 'sseho',
      age: 26,
    },
  ];

  const [membersState, setMembersState] = useState<Member[]>([]);

  return (
    <M.Container>
      {members.map((member) => (
        <M.Member key={member.id}>{member.name}</M.Member>
      ))}
    </M.Container>
  )
}
```


아래와 같이 작성해주시기 바랍니다...
```tsx
interface Member {
  id: number
  name: string
  age: number
}

function Main() {
  const members: Member[] = [
    {
      id: 1,
      name: 'jinhokim',
      age: 26,
    },
    {
      id: 2,
      name: 'sseho',
      age: 26,
    },
  ];

  return (
    <M.Container>
      {members.map((member) => (
        <EachMember key={member.id} member={member} />
      ))}
    </M.Container>
  )
}
```

```tsx
interface EachMemberProps {
  member: Member
}

function EachMember({member}: EachMemberProps) {
  const [memberState, setMemberState] = useState<Member>();

  return (
    <EM.Container>
      {member.id}
    </Em.Container>
  )
}
```


## 추가 코드 규칙

+ indent 2 규칙
  - 지키기 쉽지 않겠지만 indent 2 제한을 최대한 맞춰보면서 개발을 해봅시다.
  - 진짜 쉽지 않을 것 같음... html 부분은 예외

+ 함수 최대 길이 15줄 제한
  - 컴포넌트 함수 외 기능을 수행하는 함수는 15줄이 넘어서는 안됩니다.
  - 넘어가는 함수가 생기면 함수를 분리해주세요
