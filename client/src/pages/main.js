import React, { useEffect } from "react";
import ControlItem from '../components/user-control-item';
import logo from '../logo.svg';

function Main() {
    const host = "";
    const [data, setData] = React.useState(null);
    const [buttonStatus, setButtonStatus] = React.useState(new Map());

    useEffect(() => {
        const timer = setInterval(getClient, 2000);
        return () => clearInterval(timer);
    }, []);

    const getClient = async () => {
        const result = await fetch(host + "/api/clients");
        const data = await result.json();

        setData(data);
    }

    async function flush(userId) {
        console.log('flush', userId);
        const result = await fetch(host + "/api/clients/flush" + '?userId=' + userId);

        // set button status to disable and set timeout to enable

        return result;
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                {/*<p>{!data ? "Loading..." : data}</p>*/}
                {!data ? 'Loading...' : ''}
                {data && data.length > 0 && data.map((item, index) => {
                    return (<ControlItem status={buttonStatus[item]} userId={item} text={'Flush'} click={() => flush(item)}></ControlItem>)
                })}
            </header>
        </div>
    );
}

export default Main;
