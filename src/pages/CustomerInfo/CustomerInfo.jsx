import { Card } from "antd";
import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import SideBar from "../../Layout/SideBar/SideBar";

const CustomerInfo = ({ input, meta }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    return input.onChange(convertToRaw(editorState.getCurrentContent()));
  };

  console.log(editorState);

  return (
    <SideBar>
      <Card title="OnBoard Ops" bordered={false}>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={onEditorStateChange}
        />
      </Card>
    </SideBar>
  );
};

export default CustomerInfo;
