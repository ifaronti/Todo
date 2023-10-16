export default function NavBar(props){
return ( <nav className='navBar'>
            <div className="header_theme">
              <h1 className="nav_header">TODO</h1>
              <button onClick={props.themeSwitcher} className="themeBtn"><img className="theme_img"  src={`${process.env.PUBLIC_URL}/asset/images/${props.theme === 'light' ? 'moon.svg':'sun.svg'}`} alt="/" /></button>
            </div>
            <img className="nav_image" src={`${process.env.PUBLIC_URL}/asset/images/${props.theme === 'light' ? 'light.jpg':'dark.jpg'}`} alt="/" />
        </nav>
  )
}