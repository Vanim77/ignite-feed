import { Avatar } from './Avatar';
import { Comment } from './Comment';
import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'

import styles from './Post.module.css';

export function Post({ author, content, publishedAt }) {
    const publishedDateFormatted = format(
      publishedAt,
      "d 'de' LLLL 'às' HH:mm'h'",
      { locale: ptBR }
    );

    const publishedDateRelativeToNow = formatDistanceToNow(
      publishedAt,
      {
        locale: ptBR,

        // adiciona um prefixo antes do texto - ex: "há 25 minutos"
        // o nome da chave é addSuffix por conta de como é o resultado em inglês
        addSuffix: true
      },
    );

    return (
      <article className={styles.post}>
        <header>
          <div className={styles.author}>
              <Avatar src={author.avatarUrl} />
              <div className={styles.authorInfo}>
                  <strong>{author.name}</strong>
                  <span>{author.role}</span>
              </div>
          </div>

          <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
            {publishedDateRelativeToNow}
          </time>
        </header>

        <div className={styles.content}>
          {content.map((item, key) =>
            item.type === 'paragraph' ? <p key={key}>{item.content}</p> : <p><a key={key} href="#">{item.content}</a></p>
          )}
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

        <div className={styles.commentList}>
          <Comment />
          <Comment />
          <Comment />
        </div>
      </article>
    );
}
