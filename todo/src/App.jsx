import { useState } from "react";
function App() {
  const [listItem, setListItem] = useState("");
  const [leftList, setLeftList] = useState([]);
  const [rightList, setRightList] = useState([]);

  function addToLeftList() {
    setLeftList((currentList) => {
      return [
        ...currentList,
        { name: listItem, id: crypto.randomUUID(), checked: false },
      ];
    });
    setListItem("");
  }

  function checkLeftItem(itemId, checked) {
    setLeftList((currentList) => {
      return currentList.map((item) => {
        if (item.id === itemId) {
          return { ...item, checked: checked };
        } else {
          return item;
        }
      });
    });
  }

  function moveToRightList() {
    let checkedItems = [];
    setLeftList((currentList) => {
      return currentList.filter((item) => {
        if (item.checked === false) {
          return item;
        } else {
          checkedItems.push({ ...item, checked: false });
        }
      });
    });

    setRightList((currentList) => {
      return [...currentList, ...checkedItems];
    });
  }

  function checkRightItem(itemId, checked) {
    setRightList((currentList) => {
      return currentList.map((item) => {
        if (item.id === itemId) {
          return { ...item, checked: checked };
        } else {
          return item;
        }
      });
    });
  }

  function moveToLeftList() {
    let checkedItems = [];
    setRightList((currentList) => {
      return currentList.filter((item) => {
        if (item.checked === false) {
          return item;
        } else {
          checkedItems.push({ ...item, checked: false });
        }
      });
    });

    setLeftList((currentList) => {
      return [...currentList, ...checkedItems];
    });
  }
  return (
    <>
      <div className="input">
        <input
          type="text"
          className="input-item"
          id="list-item"
          value={listItem}
          onChange={(event) => setListItem(event.target.value)}
        />
        <button className="add" onClick={addToLeftList}>
          Add
        </button>
      </div>
      <div className="lists">
        <div className="list left-list">
          <h2>Left List</h2>
          <ul>
            {leftList.map((item) => {
              return (
                <li key={item.id}>
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={(event) =>
                      checkLeftItem(item.id, event.target.checked)
                    }
                  />
                  <label htmlFor="list-item">{item.name}</label>
                </li>
              );
            })}
          </ul>
          <button className="move-button move-right" onClick={moveToRightList}>
            Move to Right List
          </button>
        </div>
        <div className="divider"></div>
        <div className="list right-list">
          <h2>Right List</h2>
          <ul>
            {rightList.map((item) => {
              return (
                <li key={item.id}>
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={(event) =>
                      checkRightItem(item.id, event.target.checked)
                    }
                  />
                  <label htmlFor="list-item">{item.name}</label>
                </li>
              );
            })}
          </ul>
          <button className="move-button move-left" onClick={moveToLeftList}>
            Move to Left List
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
