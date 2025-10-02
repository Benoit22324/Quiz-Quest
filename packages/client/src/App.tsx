import { AuthProvider } from "./adapters/ui/context/AuthContext"
import { MainRoutes } from "./adapters/ui/routes/MainRoutes"

function App() {
  return (
    <>
      <AuthProvider>
        <MainRoutes />
      </AuthProvider>
    </>
  )
}

export default App
