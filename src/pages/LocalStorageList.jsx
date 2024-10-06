
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from 'react';
import "../ShoppingList.css";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';

export default function LocalStorageList() {

    //spuštění shopping listu, nastavení hodnot listu - extrakce z local storage
    const [list, setList] = useState(() => {
        const savedList = localStorage.getItem("shoppingList");
        return savedList ? JSON.parse(savedList) : [];
    });

    //aktualizace local storage při změně hodnot listu
    useEffect(() => {
        localStorage.setItem("shoppingList", JSON.stringify(list));
    }, [list]);

    //funkce pro check (true / false) checkboxu dané položky
    const handleCheck = (id) => {
        const listCopy = list.map(item => item.id === id ? {...item, checked: !item.checked} : {...item});
        setList(listCopy);
    };

    //funkce pro vymazání položky ze seznamu
    const deleteItem = (id) => {
        const listCopy = list.filter(item => item.id !== id);
        setList(listCopy);
    }

    //konstanta nesoucí hodnotu nově přidané položky
    const [newItem, setNewItem] = useState("");

    //funkce přidání nové položky (newItem)
    const addNewItem = () => {
        if (newItem.trim() === "") return;
        const listCopy = [...list, {id: uuid(), item: newItem, checked: false}];
        setList(listCopy);
        setNewItem("");
    }

    //spuštění funkce pro přidání nové položky i při stisknutí enter
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            addNewItem();
        } 
    }

    //konstanta nesoucí hodnotu filtrovací položky
    const [searchedItem, setSearchedItem] = useState("");


    return (
        <div className="outerBox shoppingList">
            <div className="innerBox">  
                <h2>Shopping List - Local Storage</h2>
                <p>This shopping list saves the entered data to <span>local storage</span>, so even after refreshing the page, the entered values remain unchanged. The shopping list also allows filtering items based on the entered string.</p>

                <div className="itemBox">
                    <label htmlFor="newItem">Add an item:</label>
                    <input
                        type="text"
                        id="newItem"
                        name="newItem"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        className="inputStyle"
                        onKeyPress={handleKeyPress}
                        placeholder='Add new item'
                    />
                    <AddCircleIcon className='icon' onClick={addNewItem}/>
                </div>

                <div className="itemBox">
                    <label htmlFor='searchedItem'>Search item:</label>
                    <input
                        type='text'
                        id='searchedItem'
                        name='searchedItem'
                        value={searchedItem}
                        onChange={(e) => setSearchedItem(e.target.value)}
                        className="inputStyle"
                        placeholder='Search for an item'
                    />
                    <SearchIcon className='icon'/>
                </div>
                
                {list.length ? (
                        <ul>
                            {list
                                .filter(item => item.item.toLowerCase().includes(searchedItem.toLowerCase()))
                                .map(item =>
                                    <li key={item.id}>
                                        <input type='checkbox' checked={item.checked} onChange={() => handleCheck(item.id)}/>
                                        <label className={item.checked && "checkedLabel"}>{item.item}</label>
                                        <DeleteIcon className="deleteIcon" onClick={() => deleteItem(item.id)}/>
                                    </li>
                            )}
                        </ul>
                    )
                    :
                    (
                        <p>The list is empty.</p>
                    )
                } 
            </div>
        </div>
    )
}







