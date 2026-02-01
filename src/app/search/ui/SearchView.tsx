import "./SearchView.css"
import {observer} from "mobx-react-lite";
import {JustId, JustUtil} from "@kangtae49/just-layout";
import {List, ListImperativeAPI} from "react-window";
import PostListRow from "@/app/post-list/ui/PostListRow.tsx";
import {useRef} from "react";
import useSearchStore from "@/app/search/useSearchStore.ts";
import {SEARCH_ID} from "@/app/search/search.constants.ts";
import SearchRow from "@/app/search/ui/SearchRow.tsx";

interface Props {
  justId: JustId
  layoutId: string
}

const SearchView = observer(({justId, layoutId}: Props) => {
  const listRef = useRef<ListImperativeAPI | null>(null);
  const searchStore = useSearchStore(SEARCH_ID)
  // if (!searchStore.searchText) return null

  // window.api.searchText(searchStore.searchText).then((res) => {
  //   searchStore.setPostList(res)
  // })

  return (
    <div className="search-list-view">
      <div className="search-list-title">
        <div className="search-list-name">{searchStore.searchText}</div>
      </div>
      <div className="search-list-content">
        <List
          listRef={listRef}
          className="search-list-table"
          rowComponent={SearchRow}
          rowCount={searchStore.postList.length}
          // rowCount={200}
          rowHeight={25}
          rowProps={{
            count: searchStore.postList.length,
            layoutId,
            postList: searchStore.postList
          }}
          overscanCount={250}
          style={{}}
        />
      </div>
    </div>
  )
})

export default SearchView
