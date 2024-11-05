// app/routes/index.jsx
import { Card, EmptyState } from '@shopify/polaris';

export default function Index() {
  return (
    <Card>
      <EmptyState
        heading="No Events Yet"
        action={{
          content: 'Create an event',
          onAction: () => {
            // Add logic to navigate to the event creation page
          },
        }}
        image="https://cdn.shopify.com/s/files/1/0750/3957/files/empty-state.svg"
      >
        <p>You have not created any events yet. Start by creating your first event.</p>
      </EmptyState>
    </Card>
  );
}
