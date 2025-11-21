// __tests__/StatefulButton.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import StatefulButton from '@/modules/statefulButton';

describe('StatefulButton', () => {
  it('changes the state value from 0 to 1 upon button click', () => {
    // 1. ARRANGE (Render the component)
    render(<StatefulButton />);

    // --- ASSERT INITIAL STATE (Value is 0) ---
    
    // Find the display element by its test ID
    const stateDisplay = screen.getByTestId('state-display');
    
    // Assert that the element's content initially includes "0"
    // The matchers from @testing-library/jest-dom are used here
    expect(stateDisplay).toHaveTextContent('Current Value: 0');
    
    // 2. ACT (Simulate the button click)
    
    // Find the button using its accessible name (the text inside it)
    const button = screen.getByRole('button', { name: /Change Value/i });
    
    // Simulate a click event on the button
    fireEvent.click(button);

    // 3. ASSERT FINAL STATE (Value is 1)
    
    // Assert that the element's content has now updated to include "1"
    // RTL automatically handles the asynchronous nature of React state updates
    expect(stateDisplay).toHaveTextContent('Current Value: 1');
  });
});