import "./FindBar.css"
import {observer} from "mobx-react-lite";
import useFindBarStore from "@/app/find-bar/useFindBarStore.ts";
import {FIND_BAR_ID} from "@/app/find-bar/findBar.constants.ts";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faCircleXmark, faDownLong, faMagnifyingGlass, faUpLong} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import useSearchStore from "@/app/search/useSearchStore.ts";
import {SEARCH_ID} from "@/app/search/search.constants.ts";
import {JustId, useJustLayoutStore} from "@kangtae49/just-layout";
import {CONTENTS_VIEW} from "@/app/layout/layout.tsx";

interface Props {
  layoutId: string
}
const FindBar = observer(({layoutId}: Props) => {
  const findBarStore = useFindBarStore(FIND_BAR_ID)
  const searchStore = useSearchStore(SEARCH_ID)
  const justLayoutStore = useJustLayoutStore(layoutId)

  const clearText = () => {
    findBarStore.setShowFindBar(false)
    window.api.findStop()
    findBarStore.setFindText("")
  }

  const changeText = (text: string) => {
    findBarStore.setFindText(text)
  }

  const findText = () => {
    console.log('findText', findBarStore.findText)
    if (!findBarStore.findText.trim()) return
    // window.api.findStop()
    window.api.findInPage(findBarStore.findText, {findNext: true, forward: true})
    window.api.searchText(findBarStore.findText).then((res) => {
      searchStore.setSearchText(findBarStore.findText.trim())
      searchStore.setPostList(res)
    })
  }

  const findNext = () => {
    console.log('findNext', findBarStore.findText)
    if (!findBarStore.findText) return
    window.api.findInPage(findBarStore.findText, {findNext: false, forward: true})
  }

  const findPrev = () => {
    console.log('findPrev', findBarStore.findText)
    if (!findBarStore.findText) return
    window.api.findInPage(findBarStore.findText, {findNext: false, forward: false})
  }

  const openSearchView = () => {
    const searchJustId: JustId = { viewId: 'search-view', title: '검색'}
    justLayoutStore.openWinByNodeName({justId: searchJustId, nodeName: CONTENTS_VIEW})
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      findText()
    }
  }
  return (
    <div className="find-bar">
      <div className="search">
        <div onClick={openSearchView}>
          <Icon icon={faMagnifyingGlass} />
        </div>
        <div className="search-text">
          <input type="text" value={findBarStore.findText}
                 onKeyDown={handleKeyDown}
                 onChange={(e) => changeText(e.target.value)}/>
        </div>
      </div>
      <div onClick={clearText}><Icon icon={faCircleXmark} /></div>
      <div onClick={findPrev}><Icon icon={faUpLong} /></div>
      <div onClick={findNext}><Icon icon={faDownLong} /></div>
    </div>
  )
})

export default FindBar;

