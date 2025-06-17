# 💎태스크 매니저

## 💟개발 목적

실사용
겸사겸사 포트폴리오도...

## 💟필요 기능

1. 해야 할 일, 진행중, 테스트, 서버 반영 대기, 작업 완료 대시보드 구분
2. 각 대시보드에서 태스크가 옮겨다닐 때 그 날짜와 시간이 저장됨
3. 대시보드와 캘린더가 자동 연동, 할 일 -> 작업완료 대시보드 이동 일시 기록되어 자동으로 표기됨
4. 커스텀 태그 및 레이블 등록으로 업무 종류 구분 가능
5. 캘린더에서 트래그 앤 드랍으로 태스크 날짜 변경, 기간 설정 가능

➡️나중에 작업하다가/사용하다가 필요한 기능 있으면 추가 가능

## 💟서버 호스팅

닷홈 무료 호스팅 사용. 추후 데이터가 쌓이거나 다른 사용자 유입(과연) 시 유료 전환 가능

## 💟프론트엔드

Next.js
JSON 으로 테스트 데이터 적용
[React-Bootstrap](https://react-bootstrap.netlify.app/docs/getting-started/introduction) 사용

## 💟작업 기간 (계획)

프론트 : 25.06.11 ~ 25.07.31
백 : 그 이후

## 폴더 구조

Context 구조로 관리. Next도 Context 구조도 처음이라 많이 버벅댄다.

### Navigation

일단은 Main, Calendar, Dash Board로 구성하긴 했는데 Main 화면을 어떻게 구성할 지는 계획 무.

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

### Dash Board

일정을 추가하고 드래그해서 할일 -> 진행중 -> 완료 옮길 수 있음. 동시에 상태 변화.

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
