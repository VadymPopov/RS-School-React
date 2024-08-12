import { screen, fireEvent } from '@testing-library/react';
import Flyout from '../components/Flyout';
import { renderWithContext } from '../test-utils/renderWithContext';
import { unselectAll } from '../redux/starShipSlice';
import { store } from '../redux/store';

const mockItems = [
  {
    name: 'Falcon 1',
    model: 'YT-1300 light freighter',
    manufacturer: 'Corellian Engineering Corporation',
    url: 'https://swapi.dev/api/starships/10',
  },
  {
    name: 'Falcon 2',
    model: 'YT-1300 light freighter',
    manufacturer: 'Corellian Engineering Corporation',
    url: 'https://swapi.dev/api/starships/10',
  },
  {
    name: 'Falcon 3',
    model: 'YT-1300 light freighter',
    manufacturer: 'Corellian Engineering Corporation',
    url: 'https://swapi.dev/api/starships/10',
  },
];

describe('Flyout', () => {
  it('displays the correct message based on the number of items', () => {
    const items = [
      {
        name: 'Falcon',
        model: 'YT-1300 light freighter',
        manufacturer: 'Corellian Engineering Corporation',
        url: 'https://swapi.dev/api/starships/10',
      },
    ];
    renderWithContext(<Flyout items={items} />);
    expect(screen.getByText('1 item is selected')).toBeInTheDocument();

    renderWithContext(<Flyout items={mockItems} />);
    expect(screen.getByText('3 items are selected')).toBeInTheDocument();
  });

  it('triggers CSV download on button click', () => {
    const items = [
      {
        name: 'Falcon',
        model: 'YT-1300 light freighter',
        manufacturer: 'Corellian Engineering Corporation',
        url: 'https://swapi.dev/api/starships/10',
      },
    ];

    const { container } = renderWithContext(<Flyout items={items} />);
    const downloadButton = screen.getByText('Download');

    const createObjectURLMock = vi.fn().mockReturnValue('mocked-url');
    const revokeObjectURLMock = vi.fn();

    Object.defineProperty(URL, 'createObjectURL', {
      value: createObjectURLMock,
      writable: true,
    });

    Object.defineProperty(URL, 'revokeObjectURL', {
      value: revokeObjectURLMock,
      writable: true,
    });

    const linkElement = container.querySelector('a')!;
    HTMLAnchorElement.prototype.click = vi.fn();
    const clickSpy = vi.spyOn(linkElement, 'click');

    fireEvent.click(downloadButton);

    expect(createObjectURLMock).toHaveBeenCalled();
    expect(revokeObjectURLMock).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();

    createObjectURLMock.mockRestore();
    revokeObjectURLMock.mockRestore();
  });

  it('dispatches unselectAll action on button click', () => {
    const items = [
      {
        name: 'Falcon',
        model: 'YT-1300 light freighter',
        manufacturer: 'Corellian Engineering Corporation',
        url: 'https://swapi.dev/api/starships/10',
      },
    ];

    const dispatchSpy = vi.spyOn(store, 'dispatch');
    renderWithContext(<Flyout items={items} />);

    const unselectButton = screen.getByText('Unselect all');
    fireEvent.click(unselectButton);

    expect(dispatchSpy).toHaveBeenCalledWith(unselectAll());
  });
});
