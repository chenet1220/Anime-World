import './HomePage.css'; // Import the CSS file

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="header">
        <h1>😁 WELCOME TO ANIME WORLD 🌍</h1>
      </div>
      <div className="icons">
        <i className="fas fa-tv" title="Anime TV"></i>
        <i className="fas fa-film" title="Anime Film"></i>
      </div>
      <div className="flex-container">
        <div className="flex-item info-box">
          <h1>Got A Favorite Anime?😎</h1>
          <p>
            Take a journey into Some of the Best Collection of Anime This app has to offer, from the
            popular classics such as Naruto, Bleach, and One Piece to even the newer anime
            such as Kaiju No. 8 and Windbreaker.
          </p>
        </div>
        <div className="flex-item feedback-box">
          <h1>Feed Back👂</h1>
          <p>
            Give your opinion on certain shows by making a comment, have friendly debates
            or agreements on anime you're equally interested in, while also being able to
            give an honest rating of what you think of the show.
          </p>
        </div>
      </div>
    </div>
  );
}