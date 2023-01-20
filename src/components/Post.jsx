import styles from './Post.module.css';

export function Post() {
    return (
      <article className={styles.post}>
        <header>
          <div className={styles.author}>
              <img className={styles.avatar} src="https://github.com/Vanim77.png"/>
              <div className={styles.authorInfo}>
                  <strong>Giovanni Nunes</strong>
                  <span>Web Developer</span>
              </div>
          </div>

          <time title="20 de Janeiro às 08:13h" dateTime="2023-01-20 09:12:30">Publicado há 1h</time>
        </header>

        <div className={styles.content}>
          <p>Fala galeraa 👋</p>
          <p>Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀</p>
          <p><a href="#">👉 jane.design/doctorcare</a></p>
          <p><a href="#">#novoprojeto #nlw #rocketseat</a></p>
        </div>

        <form className={styles.commentForm}>
          <strong>Deixe seu feedback</strong>
          <textarea
            placeholder="Deixe um comentário"
          />
          <footer>
            <button type="submit">Comentar</button>
          </footer>
        </form>
      </article>
    );
}
