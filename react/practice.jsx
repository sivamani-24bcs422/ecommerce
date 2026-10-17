 function App() {

  const appName = import.meta.env.VITE_APP_NAME;
  const apiUrl = import.meta.env.VITE_API_URL;

  return (
    <div>
      <h1>{appName}</h1>
      <p>API URL: {apiUrl}</p>
    </div>
  );
}

export default App;