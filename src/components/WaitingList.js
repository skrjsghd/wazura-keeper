import React from 'react';

function WaitingList({info, selection, deleteList}) {
    
    return (
        <div>
            <div id={info.userInfo.customer_id}>
                    <h3>{info.userInfo.customer_id}</h3>
                    <div>{info.reservation.person}명 / {info.reservation.time} 도착예정</div>
                    <button onClick={()=>selection(info)}>수락</button>
                    <button onClick={()=>deleteList(info)}>취소</button>
            </div>
        </div>
    )
}

export default WaitingList;
