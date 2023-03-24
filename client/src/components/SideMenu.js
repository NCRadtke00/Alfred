import React from 'react';
import "../App.css";
function SideMenu({ models, setCurrentModel, clearChat }) {
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        async function getEngines() {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:3080/models');
                const data = await response.json();
                models(data.models);
            } catch (error) {
                console.error(error);
            }
            setIsLoading(false);
        }
        getEngines();
    }, []);

    return (
        <aside className='side-menu'>
            <div className='side-menu-button' onClick={clearChat}>
                <span>+</span> New Chat
            </div>
            <div className="models">
                {isLoading ? (
                    <p>Loading models...</p>
                ) : (
                    <select onChange={(e) => setCurrentModel(e.target.value)}>
                        {models.length > 0 && models.map((model, index) => (
                            <option key={model.id} value={model.id}>
                                {model.id}
                            </option>
                        ))}
                    </select>
                )}
            </div>
        </aside>
    );
}

export default SideMenu;