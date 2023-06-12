# Component

## App

App Component의 역할은

1. data를 외부로부터 갖고 와서 상태로 저장하는 것
2. data를 가지고 다른 컴포넌트에게 props로 넘겨주는 것
3. 변경 사항이 있다면 반영해서 다시 다른 컴포넌트에게 props로 넘겨주는 것

만약, 데이터를 가져오는데 성공했다면 컴포넌트들을 렌더링하고 그렇지 못했다면 단순 "Table"이라고 적혀진 텍스트만 보여지도록 구현.

## Table Component

Table Component의 역할은 데이터를 받아서 보여주는 것!

1. 외부에서 사용할 수 있는 setState만 this객체의 속성으로 정의
2. init함수를 통해서 table, thead, tbody에 대한 부분을 한 번만 렌더링할 수 있도록 정의

- 변경되는 부분은 table의 데이터 영역이므로 나머지 태그들을 한 번만 렌더링한다.

3. 데이터의 key값을 받아서 table Header를 구성할 수 있도록 tableKeys 인자 받음.

- 해당 key값은 외부에 정의되어 있다고 생각하고 상수로 정의.

## Pagination

Pagination Component의 역할은 데이터를 받아서 버튼을 구성하고, 이벤트 동작을 달아주는 것!

1. maxPageNum, curPageNum state를 가지고 있는 컴포넌트로 maxPageNum에 맞춰서 버튼을 생성하고, curPageNum인 버튼은 빨간색으로 스타일링한다.
2. 버튼을 누를 때마다 onClick 메서드를 호출.

- 실제로는 curPageNum에 맞춰서 Table Component도 새로 렌더링되지만, Pagination 컴포넌트에서는 단순히 현재 index가 무엇이었는지만 넘겨줄 뿐, 다른 동작은 신경쓰지 않는다.

## Dropdown

Dropdown Component의 역할은 option value들에 대해 select로 표현하고, 선택한 값을 외부에 알리는 것!

# 고민한 부분

Table Component의 사용성을 높이기 위해서 Table Head의 키 또한 prop으로 받고 있다. 이 키를 건네주는 방법으로 3가지를 생각할 수 있었다.

- 상수로 정의하기

```
const KEYS = ["name", ...];
```

- Object.keys()를 이용해서 처음 데이터의 키값을 뽑아서 전달하기

```
new Table({
    ...
    tableKeys: Object.keys(state.workers[0])
})
```

- api 호출 단에서 key에 대한 필드를 만들어서 데이터로 건네주기

```
export async function getWorkers(url) {
  try {
    const data = await request("/data.json");

    return {
      keys: Object.keys(data[0]),
      data,
    };
  } catch (e) {
    throw new Error(e);
  }
}
```

1. 첫번째는 만약 데이터 키 값이 계속 바뀐다고 한다면 매번 수정해줘야 하는 부분이라 선택하지 않았다.
2. 두번째와 세번째도 최선의 방법인가 하는 부분에서는 잘 모르겠다. 백엔드에서 보내주는 데이터 구조가 바뀔지 모르는 상황에 첫번째가 항상 원하는 데이터값이라고 보장할 수도 없다고 생각했다. 하지만, 만약 수정이 이뤄진다면 어디에서 해야할까 생각하던 중에 컴포넌트 내부를 수정하는 것보다 API에서 수정하는 것이 더 좋겠다고 생각하게 되었다.

- 데이터 구조가 바뀌어도 컴포넌트가 받는 데이터는 `{keys, data}`로 고정이어서 컴포넌트는 수정할 필요가 없다.
- 데이터의 변경 사항이 api에 몰려있기 때문에 관리하기가 더 쉬울 것이라 생각했다.

결론은 세번째 방법으로 구현하게 되었다.
