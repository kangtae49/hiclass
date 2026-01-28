import {RowComponentProps} from "react-window";
import {Observer} from "mobx-react-lite";
import useJsonDataStore from "@/app/json-data/useJsonDataStore.tsx";
import {JSON_DATA_ID} from "@/app/json-data/jsonData.constants.ts";
import pathUtils from "@/utils/pathUtils.ts";
import {CONTENTS_VIEW} from "@/app/layout/layout.tsx";
import useBoardStore from "@/app/board/useBoardStore.ts";
import {BOARD_ID} from "@/app/board/board.constants.ts";
import classNames from "classnames";
import {JustId, useJustLayoutStore} from "@kangtae49/just-layout";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome"
import {faMessage, faImage, faFilm, faMusic} from "@fortawesome/free-solid-svg-icons";

interface Props {
  count: number
  layoutId: string
  boardId: string
}

const BoardListRow = ({
  index,
  style,
  count,
  layoutId,
  boardId
}: RowComponentProps<Props>) => {
  const justLayoutStore = useJustLayoutStore(layoutId)
  const jsonDataStore = useJsonDataStore(JSON_DATA_ID)
  const boardStore = useBoardStore(BOARD_ID)

  const boardListKey = pathUtils.getScriptSubPath(`data\\${boardId}.json`)
  const data = jsonDataStore.jsonDataMap[boardListKey]?.data
  const row = data?._embedded.posts[index]
  const no = count - index
  const title = row?.postTitle
  const commentCount = row?.commentCount || 0
  const attachCount = row?.files?.length || 0
  const imageCount = row?.files.filter((file)=>file.fileContentType.startsWith('image')).length || 0
  const videoCount = row?.files.filter((file)=>file.fileContentType.startsWith('video')).length || 0
  const audioCount = row?.files.filter((file)=>file.fileContentType.startsWith('audio')).length || 0


  const clickPost = () => {
    const justId: JustId = { viewId: "post-active-view", title: '내용' }
    boardStore.setPost({postId: row?.postId, boardId})
    justLayoutStore.openWinByNodeName({justId, nodeName: CONTENTS_VIEW})
  }
  return (
    <Observer>
      {() => (
        <div className={classNames("board-list-row", {"active": boardStore.post?.postId === row?.postId})} style={style} onClick={clickPost}>
          <div className="row-no">{no}</div>
          <div className="row-title">
            {title}

            {(attachCount + commentCount) > 0 && ' - '}
            {commentCount > 0 && <><Icon icon={faMessage} />{commentCount}</>}
            {imageCount > 0 && <><Icon icon={faImage} />{imageCount}</>}
            {videoCount > 0 && <><Icon icon={faFilm} />{videoCount}</>}
            {audioCount > 0 && <><Icon icon={faMusic} />{audioCount}</>}

          </div>
        </div>
      )}
    </Observer>
  )
}

export default BoardListRow
