interface IProps {
  searchResultsId: string
}

export default function NoSearchResults({ searchResultsId }: IProps) {
  return (
    <p
      id={searchResultsId}
      className="p-4 mt-4 bg-slate-200 font-bold tracking-wider"
    >
      Din sökning gav inga sökresultat. Testa att söka på något annat.
    </p>
  )
}
