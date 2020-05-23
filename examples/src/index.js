import React from "react";
import { render } from "react-dom";
import PinchZoomPan from "../../src/PinchZoomPan";
import jill from './img/jill.jpeg';

const isDevelopment = () => process.env.NODE_ENV !== 'production';

const SizedContainerView = ({menu, width, height}) => {
    return (
        <div>
            <nav>{menu}</nav>
            <main style={{ width: `${width}px`, height: `${height}px` }}>
                <PinchZoomPan doubleTapBehavior='zoom' debug={isDevelopment()}>
                    <img alt='Demo Image' src={jill} />
                </PinchZoomPan>
            </main>
        </div>
    );
}

const CenteredView = ({menu, width, height}) => {
    return (
        <div>
            <nav>{menu}</nav>
            <main style={{ width: `${width}px`, height: `${height}px` }}>
                <PinchZoomPan doubleTapBehavior='zoom' position='center' initialScale={1} minScale={1} maxScale={4} zoomButtons={false} debug={isDevelopment()}>
                    <img alt='Demo Image' src={jill} />
                </PinchZoomPan>
            </main>
        </div>
    );
}

const FixedFullscreen = ({menu}) => {
    return (
        <div style={{
            font: '15px Ubuntu, Arial, sans-serif',
            background: '#2d2d2d',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            height: '100%',
            touchAction: 'manipulation',
        }}>
            <div style={{
                overflow: 'auto'
            }}>
                <div style={{
                    overflow: 'visible',
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    boxSizing: 'border-box',
                    background: '#2d2d2d',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: 15,
                }}>
                    <div style={{position: 'fixed', left: 0, top: 0, width: '100%', height: '100%'}}>
                        <PinchZoomPan doubleTapBehavior='zoom' position='center' zoomButtons={false} debug={isDevelopment()}>
                            <img alt='Demo Image' src={jill} />
                        </PinchZoomPan>
                    </div>
                </div>
            </div>
        </div>
    );
}

const flexContentStyle = {
    fontSize: 20,
    margin: 'auto',
}
const FlexContainerView = ({menu}) => (
    <div style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
        <nav style={{flex: 'none'}}>{menu}</nav>
        <div style={{flex: 'none', textAlign: 'center'}}><span style={flexContentStyle}>The image fills 100% of the flex item in which it is contained</span></div>
        <main style={{flex: 'auto', overflow: 'hidden', display: 'flex'}}>
            <div style={{flex: 'none', alignSelf: 'center'}}>
                <span style={flexContentStyle}>Sidebar</span>
            </div>
            <div style={{flex: 'auto', overflow: 'hidden', position: 'relative'}}>
                <div style={{position: 'absolute', height: '100%', width: '100%'}}>
                    <PinchZoomPan debug={isDevelopment()} position='center' zoomButtons={false}>
                        <img alt='Demo Image' src={jill} />
                    </PinchZoomPan>
                </div>
            </div>
        </main>
    </div>
)

const Menu = ({viewId, onViewChange}) => {
    const getLinkStyle = linkViewId => {
        return {
            padding: 10,
            color: viewId === linkViewId
                ? 'orange'
                : 'blue',
        };
    };

    return (
        <React.Fragment>
            <span style={{fontSize: 20, fontWeight: 'bold', padding: 10}}>Demo</span>
            <a href='#' onClick={() => onViewChange(0)} style={getLinkStyle(0)}>Small</a>
            <a href='#' onClick={() => onViewChange(1)} style={getLinkStyle(1)}>Medium</a>
            <a href='#' onClick={() => onViewChange(3)} style={getLinkStyle(3)}>Centered</a>
            <a href='#' onClick={() => onViewChange(2)} style={getLinkStyle(2)}>Full-screen Flex</a>
            <a href='#' onClick={() => onViewChange(4)} style={getLinkStyle(2)}>Fixed full-screen</a>
        </React.Fragment>
    );
}

class App extends React.Component {
    state = {
        viewId: 0
    }

    handleViewChange = viewId => {
        this.setState({
            viewId
        });
    }

    render() {
        const { viewId } = this.state;
        const menu = <Menu viewId={viewId} onViewChange={this.handleViewChange} />
        return (
            viewId === 2 ? <FlexContainerView menu={menu} />
            : viewId === 3 ? <CenteredView menu={menu} width={300} height={500} imageWidth={200} imageHeight={400} />
            : viewId === 4 ? <FixedFullscreen menu={menu} />
            : viewId === 1 ? <SizedContainerView menu={menu} width={500} height={800} />
            : <SizedContainerView menu={menu} width={300} height={500} />
        );
    }
}

render(<App />, document.getElementById("root"));
