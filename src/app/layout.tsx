import Header from '@/components/header'
import Footer from '@/components/footer'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa">
      <body className="bg-gray-900 flex flex-col p-4 ">
        <div className="w-full bg-white mx-auto rounded-2xl p-5 min-h-screen">
          <Header />
          {children}
          <Footer/>
        </div>
      </body>
    </html>
  )
}
