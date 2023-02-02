import { Link } from "react-router-dom";

function Header() {

  const apiKeyName = process.env.REACT_APP_NAME;

  return (
    <div>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="http://localhost:3000/">
                <h1 className="title is-4">{apiKeyName}</h1>
            </a>
        
            <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
        
          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item">
                <Link to="/">Home</Link>
              </a>
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                  Usuários
                </a>
                <div className="navbar-dropdown">
                  <Link to="/users" className="navbar-item">- Lista de usuários</Link>
                  <Link to="/users/add" className="navbar-item">- Adicionar novo usuário</Link>
                </div>
              </div>
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                  Tarefas
                </a>
                <div className="navbar-dropdown">
                  <Link to="/todos" className="navbar-item">- Lista de tarefas</Link>
                  <Link to="/todos/add" className="navbar-item">- Adicionar nova tarefa</Link>
                </div>
              </div>
            </div>
        
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <Link className="button is-primary" to="/todos">
                    <strong>Tarefas</strong>
                  </Link>
                  <Link className="button is-danger" to="/">
                    Sair
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    
  )
}

export default Header;
