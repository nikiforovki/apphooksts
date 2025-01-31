import React from 'react';
import PopularTags from '@shared/PopularTags';

const FeedSidebar: React.FC = () => {
  const tags = ['react', 'typescript', 'javascript', 'webdev'];
  const selectedTag = null;

  return (
    <div>
      <PopularTags
        tags={tags}
        selectedTag={selectedTag}
        onTagClick={(tag) => (window.location.href = `/tags/${tag}`)}
      />
    </div>
  );
};

export default FeedSidebar;

// import React from 'react';
// import PopularTags from '@shared/PopularTags';

// const FeedSidebar: React.FC = () => {
//   return (
//     <div>
//       <PopularTags
//         onTagClick={(tag) => (window.location.href = `/tags/${tag}`)}
//       />
//     </div>
//   );
// };

// export default FeedSidebar;
