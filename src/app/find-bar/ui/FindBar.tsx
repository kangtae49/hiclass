import "./FindBar.css"
import {observer} from "mobx-react-lite";
import useFindBarStore from "@/app/find-bar/useFindBarStore.ts";
import {FIND_BAR_ID} from "@/app/find-bar/findBar.constants.ts";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faCircleXmark, faDownLong, faMagnifyingGlass, faUpLong} from "@fortawesome/free-solid-svg-icons";
import React from "react";

const FindBar = observer(() => {
  const findBarStore = useFindBarStore(FIND_BAR_ID)

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
    if (!findBarStore.findText) return
    // window.api.findStop()
    window.api.findInPage(findBarStore.findText, {findNext: true, forward: true})
    window.api.searchText(findBarStore.findText).then((res) => {
      console.log(res)
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

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      findText()
    }
  }
  return (
    <div className="find-bar">
      <div className="search">
        <div>
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

