import React from 'react'

function ProgressList({info, deleteList}) {
    return (
        <div id={info.userInfo.customer_id}>
            <h3>{info.userInfo.customer_id}</h3>
            <span>대기중</span>
            <div>{info.reservation.person}명 / {info.reservation.time} 도착예정</div>
            <button onClick={() => deleteList(info)}>취소</button>
        </div>
    )
}

export default ProgressList
