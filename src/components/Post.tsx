import { Avatar } from './Avatar';
import { Comment } from './Comment';
import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

import styles from './Post.module.css';

interface IAuthor {
  avatarUrl: string,
  name: string,
  role: string
}

interface IContent {
  type: string,
  content: string
}

interface IPostProps {
  author: IAuthor,
  content: IContent[],
  publishedAt: Date
}

export function Post({ author, content, publishedAt }: IPostProps) {
    const [comments, setComments] = useState(['Que bacana! 👏']);
    const [newCommentText, setNewCommentText] = useState('');

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

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
      // Informa ao método setCustomValidity que não há erros na textarea
      event.target.setCustomValidity('');
      setNewCommentText(event.target.value);
    }

    function handleNewComment(event: FormEvent) {
      event.preventDefault();

      setComments([...comments, newCommentText]);

      setNewCommentText('');
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
      event.target.setCustomValidity('Esse campo é obrigatório!');
    }

    function deleteComment(commentToDelete: string) {
      const commentsWithoutDeletedOne = comments.filter(comment => {
        return comment !== commentToDelete;
      });

      setComments(commentsWithoutDeletedOne);
    }

    const isNewCommentEmpty = newCommentText.length === 0;

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
          {content.map(item =>
            item.type === 'paragraph'
              ? <p key={item.content}>{item.content}</p>
              : <p key={item.content}><a href="#">{item.content}</a></p>
          )}
        </div>

        <form onSubmit={handleNewComment} className={styles.commentForm}>
          <strong>Deixe seu feedback</strong>
          <textarea
            value={newCommentText}
            placeholder="Deixe um comentário"
            onChange={handleNewCommentChange}
            required
            onInvalid={handleNewCommentInvalid}
          />
          <footer>
            <button disabled={isNewCommentEmpty} type="submit">
              Comentar
            </button>
          </footer>
        </form>

        <div className={styles.commentList}>
          {comments.map((comment) => {
            return comment === "Que bacana! 👏"
              ? <Comment
                  name="Jakeliny Gracielly"
                  src="https://github.com/jakeliny.png"
                  key={comment}
                  content={comment}
                  onDeleteComment={deleteComment}
                  commentHowLong="Cerca de 1h atrás"
                />
              : <Comment
                  name="Giovanni Nunes"
                  src="https://github.com/Vanim77.png"
                  key={comment}
                  content={comment}
                  onDeleteComment={deleteComment}
                  commentHowLong="Agora mesmo"
                />
          }
          )}
        </div>
      </article>
    );
}
