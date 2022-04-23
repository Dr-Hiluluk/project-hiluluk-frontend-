import React, {
  ChangeEvent,
  FormEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import "./TagBox.scss";
const TagItem = memo(({ tag, onRemove }: any) => (
  <div className="tag" onClick={() => onRemove(tag)}>
    #{tag}
  </div>
));

const TagList = memo(({ tags, onRemove }: any) => (
  <div className="tag-list-block">
    {tags.map((tag: string) => (
      <TagItem key={tag} tag={tag} onRemove={onRemove} />
    ))}
  </div>
));

const TagBox = ({ tags, onChangeTags }: any) => {
  const [input, setInput] = useState<string>("");
  const [localTags, setLocalTags] = useState<string[]>([]);

  const insertTag = useCallback(
    (tag: string) => {
      if (!tag) return;
      if (localTags.includes(tag)) return;
      const nextTags = [...localTags, tag];
      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags],
  );

  const removeTag = useCallback(
    (tag: string) => {
      const nextTags = localTags.filter((item) => item !== tag);
      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags],
  );

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInput(value);
  }, []);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      insertTag(input.trim());
      setInput("");
    },
    [input, insertTag],
  );

  useEffect(() => {
    setLocalTags(tags);
  }, [tags]);

  return (
    <div className="tag-box-block">
      <h4>태그</h4>
      <form className="tag-form" onSubmit={onSubmit}>
        <input
          placeholder="태그를 입력해주세요"
          value={input}
          onChange={onChange}
        />
        <button type="submit">추가</button>
      </form>
      <TagList tags={localTags} onRemove={removeTag} />
    </div>
  );
};

export default TagBox;
