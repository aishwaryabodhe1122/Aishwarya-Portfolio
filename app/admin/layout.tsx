import { SWRConfig } from 'swr'

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SWRConfig 
      value={{
        dedupingInterval: 60000, // Dedupe requests within 60 seconds
        revalidateOnFocus: false, // Don't revalidate when window regains focus
        revalidateOnReconnect: false, // Don't revalidate on reconnect
        shouldRetryOnError: false, // Don't retry on error
      }}
    >
      {children}
    </SWRConfig>
  )
}
