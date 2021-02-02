import React from 'react'

function DoneList({info}) {
    return (
        <div id={info.userInfo.customer_id}>
            <h3>{info.userInfo.customer_id}</h3>
            <span>완료</span>
            <div>{info.reservation.person}명 / {info.reservation.time} 도착예정</div>
            <div>{info.reservation.service}</div>
            <button>도착</button>
            <button>노쇼</button>
        </div>
    )
}

export default DoneList
