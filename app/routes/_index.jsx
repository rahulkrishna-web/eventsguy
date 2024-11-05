// app/routes/index.jsx
import { Page, Card, EmptyState } from '@shopify/polaris';
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";

export default function Index() {
  const generateProduct = () => {
    console.log("generate product");
  }
  return (
    <Page>
      <TitleBar title="Remix app template">
        <button variant="primary" onClick={generateProduct}>
          Events Dashboard
        </button>
      </TitleBar>
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
    </Page>
  );
}
