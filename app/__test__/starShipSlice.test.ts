import starShipReducer, {
  setStarships,
  addToSelected,
  deleteFromSelected,
  unselectAll,
} from '../redux/starShipSlice';

const mockStarShipsArr = [
  {
    name: 'StarShip 1',
    model: 'Model 1',
    manufacturer: 'Manufacturer 1',
    url: 'http://someurl.com',
  },
  {
    name: 'StarShip 2',
    model: 'Model 2',
    manufacturer: 'Manufacturer 2',
    url: 'http://someurl2.com',
  },
];

const mockStarShipObj = {
  name: 'StarShip 100',
  model: 'Model 100',
  manufacturer: 'Manufacturer 100',
  url: 'http://someurl100.com',
};

describe('starShip reducer', () => {
  it('should return initial state when passed an empty action', () => {
    const initialState = undefined;
    const action = { type: '' };
    const result = starShipReducer(initialState, action);
    expect(result).toEqual({ items: [], selectedItems: [] });
  });
  it('should set starship array to the state', () => {
    const initialState = undefined;
    const action = setStarships(mockStarShipsArr);
    const result = starShipReducer(initialState, action);
    expect(Object.keys(result.items).length).toEqual(mockStarShipsArr.length);
    mockStarShipsArr.forEach((item, idx) => {
      expect(result.items[idx]).toEqual(item);
    });
  });
  it('should add starship item to the selectedItems', () => {
    const initialState = undefined;
    const action = addToSelected(mockStarShipObj);
    const result = starShipReducer(initialState, action);
    expect(Object.keys(result.selectedItems).length).toEqual(1);
  });
  it('should delete selected item from the state', () => {
    const initialState = {
      items: [],
      selectedItems: mockStarShipsArr,
    };
    const action = deleteFromSelected('StarShip 2');
    const result = starShipReducer(initialState, action);
    expect(Object.keys(result.selectedItems).length).toEqual(1);
  });
  it('should delete all selected items from the state', () => {
    const initialState = {
      items: [],
      selectedItems: mockStarShipsArr,
    };
    const action = unselectAll();
    const result = starShipReducer(initialState, action);
    expect(Object.keys(result.selectedItems).length).toEqual(0);
  });
});
