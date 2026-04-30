
const Header = () => {
    return (
        <header>
            <h3> Lista Barata </h3>
            <i className="fa solid fa-location-dot"></i>
            <h3> São Paulo </h3>
            <form id="Pesquisa" className="pesquisa-desktop">
                <i className="fa fa-search icon"></i>
                <input type="text" placeholder="Pesquisar..."/>
            </form>
        </header>
    );
};

export default Header;