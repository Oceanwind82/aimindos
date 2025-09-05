import type { Meta, StoryObj } from '@storybook/nextjs';

const meta = {
  title: 'Components/Button',
  component: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props} style={{ padding: 12, borderRadius: 12 }}>
      {props.children}
    </button>
  ),
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { children: 'Click me' },
};
