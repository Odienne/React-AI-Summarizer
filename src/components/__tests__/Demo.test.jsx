// src/components/__tests__/Demo.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Demo from '../Demo';

test('fetches and displays a summary', async () => {
  render(<Demo />);

  const input = screen.getByPlaceholderText(/enter a url/i);
  const button = screen.getByRole('button');

  // Type a URL
  await userEvent.type(input, 'https://example.com');

  // Click submit
  await userEvent.click(button);

  // Wait for summary to appear
  const summary = await screen.findByText(/this is a mock summary/i);
  expect(summary).toBeInTheDocument();
});