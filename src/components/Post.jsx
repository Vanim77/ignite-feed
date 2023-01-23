import { Avatar } from './Avatar';
import { Comment } from './Comment';
import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import { useState } from 'react';

import styles from './Post.module.css';

export function Post({ author, content, publishedAt }) {
    const [comments, setComments] = useState(['Que bacana!']);
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

    function handleNewCommentChange({ target }) {
      // Informa ao método setCustomValidity que não há erros na textarea
      target.setCustomValidity('');
      setNewCommentText(target.value);
    }

    function handleNewComment(event) {
      event.preventDefault();

      setComments([...comments, newCommentText]);

      setNewCommentText('');
    }

    function handleNewCommentInvalid(event) {
      event.target.setCustomValidity('Esse campo é obrigatório!');
    }

    function deleteComment(commentToDelete) {
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
          {comments.map(comment => 
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteComment}
            />
          )}
        </div>
      </article>
    );
}
