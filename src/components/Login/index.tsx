import { ReactNode } from 'react'
import classNames from 'classnames'

export default function Login({ authenticator }: any) {
  return (
    <div className="md:h-screen flex flex-col items-center justify-center">
      <section className="bg-slate-200 p-10 max-w-[500px]">
        <h1 className="text-3xl">Inloggning</h1>
        <p className="mt-2">
          Logga in med kod. Som inloggad får du tillgång till väderprognoser.
        </p>
        <form onSubmit={authenticator.onSubmitCode} className="flex mt-4">
          <input
            type="text"
            placeholder="Ange kod"
            className="block px-4"
            value={authenticator.code}
            onChange={authenticator.onChangeCode}
          />
          <button type="submit" className="bg-slate-300 py-2 px-4">
            Logga in
          </button>
        </form>
      </section>
    </div>
  )
}
