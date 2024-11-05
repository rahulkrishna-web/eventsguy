// app/routes/dashboard.js
import { json } from '@remix-run/node';

export const loader = async () => {
  // Fetch any necessary data here (e.g., events, user information)

  return json({
    // This could include data you want to pass to your dashboard component
  });
};

export default function Dashboard() {
  return (
    <div>
      <h1>Welcome to the Event Management Dashboard</h1>
    </div>
  );
}
