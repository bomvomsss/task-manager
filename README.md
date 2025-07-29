# 💎태스크 매니저

## 💟개발 목적

실사용
& 포트폴리오

## 💟필요 기능

1. 할 일, 진행중, 작업 완료 대시보드 구분
2. 대시보드와 캘린더가 자동 연동, 할 일 -> 작업완료 대시보드 이동 일시 기록되어 자동으로 표기됨
3. 커스텀 태그 및 레이블 등록으로 업무 종류 구분 가능

➡️나중에 작업하다가/사용하다가 필요한 기능 있으면 추가 가능

- 캘린더에서 드래그 앤 드롭으로 일정 변경

## 💟프론트엔드

Next.js
JSON 으로 테스트 데이터 적용
[React-Bootstrap](https://react-bootstrap.netlify.app/docs/getting-started/introduction) 사용

## 💟작업 기간 (계획)

프론트 : 25.06.11 ~ 25.07.31

## 폴더 구조

Context 구조로 관리. Next도 Context 구조도 처음이라 많이 버벅댄다.

### Navigation

일단은 Main, Calendar, Dash Board로 구성하긴 했는데 Main 화면을 어떻게 구성할 지는 계획 무.

// 25.06.25
Main 페이지를 `/dashboard`으로 리다이렉트. 그리고 아마 Main 페이지가 메인으로 쓰이지 않을 것 같아서 네비게이션 최하단으로 이동.

// 25.07.29
처음 접속 시 `/main` 페이지로 리다이렉트되게 수정. 리다이렉트된 주소로 연결시 404 에러 발생. 해결 시도중

### Dash Board

일정을 추가하고 드래그해서 할일 -> 진행중 -> 완료 옮길 수 있음. 동시에 상태 변화.
제목, 내용, 기간, 태그 보이게 수정.

### Calendar

[react로 달력 구현하기](https://velog.io/@rachel28/React-%EC%BA%98%EB%A6%B0%EB%8D%94%EB%A5%BC-%EA%B5%AC%ED%98%84%ED%95%B4%EB%B3%B4%EC%9E%90-feat.-date-fns)

```
├─calendar
│  │  page.tsx
│  │
│  ├─components
│  │      CalendarBody.tsx
│  │      CalendarHeader.tsx
│  │      ScheduleItem.tsx
│  │      SelectedDate.tsx
│  │
│  └─hooks
│          useCalendar.ts
│          useCalendarContext.ts
```

훅이랑 컴포넌트를 따로 분리해서 사용. ScheduleItem은 전체 컴포넌트에서 `useAdditem.ts`와 `useCtrlItems.ts`가 관리하는 컴포넌트.

// 25.06.25
드래그 앤 드롭으로 일정 전체 날짜 옮기기까지 설정. 클릭&드래그로 기간 수정 기능도 필요

### Components

```
// 👇 이건 named export
export interface AddItemProps {
  show: boolean;
  item: TodoItemType | null;
  onSave: (item: TodoItemType) => void;
  onClose: () => void;
  onDelete: (item: TodoItemType) => void;
}

// 👇 이건 default export
export default function useAddItems({ item, onSave, onDelete }: AddItemProps) {
  const [text, setText] = useState("");
  const [contents, setContents] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
}
```

> 컴포넌트 import와 타입 import는 별개입니다.
> 타입은 반드시 명시적으로 import해야 합니다.

옳은 import 방법!
`import useAddItems, { AddItemProps } from "../hooks/useAddItems";`

참고

> https://creative103.tistory.com/217 >[부트스트랩 클래스 이름 익히기](https://inpa.tistory.com/entry/BootStrap5-%F0%9F%93%9A-%EB%B6%80%ED%8A%B8%EC%8A%A4%ED%8A%B8%EB%9E%A9-%ED%81%B4%EB%9E%98%EC%8A%A4-%EC%9D%B4%EB%A6%84-%EC%A0%95%EB%A6%AC)

//25.06.20
날짜 입력을 처음에 배열로 받아서 0번째가 시작날, 1번째가 마지막날 이렇게 코드를 짰었는데, db 연결하자마자 다 start_date , end_date로 나눠서 수정하느라 여기저기 파일 뒤적거렸음. 처음부터 그렇게 할 걸 왜 배열로 받았지?

## 💟서버

supabase 이용하여 데이터 테이블을 만들고, 필요한 컬럼 생성

### 서버 연결

```
useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Supabase fetch error:", error);
      } else if (data) {
        const normalized = data.map((item) => ({
          ...item,
          dates:
            item.dates?.length === 1
              ? [item.dates[0], item.dates[0]]
              : item.dates,
        }));

        setItems(normalized);
      }
    };

    fetchTodos();
  }, [setItems]);
```

db를 직접 짜서 서버에 연결해보는 건 처음이라 넘 재밌었다.
컬럼을 직접 확인할 수 있다니 이렇게 편한걸...

백엔드는 호락호락한 분야가 아니었다!

### 🤦‍♀️ 빌드 후 오류

리다이렉트 된 주소에서 새로고침하거나, 리다이렉트된 주소로 접속하면 404에러가 뜨는 현상이 발생.
이건 서버 컴포넌트 실행 중 내부적으로 라우터 상태만 바꾸는 동작이라 그렇다고 함. `permanentRedirect()` 사용으로 해결시도
-> 실패.

`next.config.ts`에
`trailingSlash: true,` (정적 호스팅 안정성을 위한...)

> 이 옵션을 설정하면 /about과 같은 URL은 /about/으로 리디렉션됩니다.
> output: "export" 구성과 함께 사용할 때, /about 페이지는 기본 /about.html 대신 /about/index.html을 출력합니다.
> 라고 합니다.

암튼 결국 해결 완료!
