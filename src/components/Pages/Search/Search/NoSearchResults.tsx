interface IProps {
  searchResultsId: string
}

export default function NoSearchResults({ searchResultsId }: IProps) {
  return (
    <p id={searchResultsId} className="p-4 mt-4 bg-white font-bold">
      Typiskt, hittade inga sökresultat. Testa gärna att söka på något annat.
    </p>
  )
}
