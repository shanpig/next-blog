import markdownStyles from './github.markdown.module.css';

type Props = {
  content: string;
};

const PostBody = ({ content }: Props) => (
  <div className="max-w-2xl mx-auto">
    <div
      className={`${markdownStyles.markdownBody} light`}
      // FIXME: 有機會就拿掉
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: content }}
    />
  </div>
);

export default PostBody;
