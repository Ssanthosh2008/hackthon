import React, { useState } from 'react';
import { 
  MessageSquare, 
  Heart, 
  Bookmark, 
  Share2, 
  PlusCircle, 
  Send, 
  X, 
  MessageCircle
} from 'lucide-react';
import type { NetworkingPost } from '../types';

interface NetworkingHubProps {
  posts: NetworkingPost[];
  onToggleLike: (postId: string) => void;
  onToggleSave: (postId: string) => void;
  onAddComment: (postId: string, commentText: string) => void;
  onCreatePost: (newPost: Partial<NetworkingPost>) => void;
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

export const NetworkingHub: React.FC<NetworkingHubProps> = ({
  posts,
  onToggleLike,
  onToggleSave,
  onAddComment,
  onCreatePost,
  onShowToast
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedCommentPostId, setExpandedCommentPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState<{ [postId: string]: string }>({});

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState<'Career' | 'Jobs' | 'Internships' | 'Projects' | 'Achievements' | 'Community'>('Career');
  const [postTags, setPostTags] = useState('TechTips, CampusNetwork');

  const categories = ['All', 'Career', 'Jobs', 'Internships', 'Projects', 'Achievements', 'Community'];

  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(p => p.category === selectedCategory);

  const handleCommentSubmit = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    const text = commentInput[postId];
    if (!text || !text.trim()) return;
    onAddComment(postId, text.trim());
    setCommentInput({ ...commentInput, [postId]: '' });
  };

  const handleCreatePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) return;

    onCreatePost({
      title: postTitle,
      content: postContent,
      category: postCategory,
      tags: postTags.split(',').map(t => t.trim()),
      authorName: 'Alex Morgan',
      authorRole: 'Final Year B.Tech Student',
      authorBadge: 'Student',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    });

    setCreateModalOpen(false);
    setPostTitle('');
    setPostContent('');
    onShowToast('Networking post created successfully!', 'success');
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-200 text-indigo-800 px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <MessageSquare className="w-4 h-4" />
            <span>Alumni Community Feed</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Networking Hub</h2>
          <p className="text-sm text-slate-600 mt-1">Share achievements, ask questions, discuss project ideas, and explore alumni referrals.</p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-5 py-3 rounded-2xl shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all text-xs"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create Post</span>
        </button>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* POSTS LIST */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all p-6"
          >
            {/* Author Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={post.authorAvatar}
                  alt={post.authorName}
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-100 shadow-sm"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-slate-900 text-sm">{post.authorName}</h3>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      post.authorBadge === 'Alumni' || post.authorBadge === 'Mentor'
                        ? 'bg-cyan-100 text-cyan-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {post.authorBadge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{post.authorRole}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <span>{post.timestamp}</span>
                <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 font-semibold rounded-md text-[10px]">
                  {post.category}
                </span>
              </div>
            </div>

            {/* Post Title & Content */}
            <h4 className="font-extrabold text-base text-slate-900 mb-2 leading-snug">{post.title}</h4>
            <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line mb-4">{post.content}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {post.tags.map(tag => (
                <span key={tag} className="text-[11px] font-semibold text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-md border border-cyan-100">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Post Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-semibold text-slate-600">
              
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => onToggleLike(post.id)}
                  className={`flex items-center space-x-1.5 transition-colors ${
                    post.isLiked ? 'text-rose-600 font-bold' : 'hover:text-rose-600'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                  <span>{post.likesCount} Likes</span>
                </button>

                <button
                  onClick={() => setExpandedCommentPostId(expandedCommentPostId === post.id ? null : post.id)}
                  className="flex items-center space-x-1.5 hover:text-cyan-600 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.comments.length} Comments</span>
                </button>

                <button
                  onClick={() => onShowToast(`Post "${post.title.substring(0, 20)}..." link copied!`, 'info')}
                  className="flex items-center space-x-1 hover:text-slate-900 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Share</span>
                </button>
              </div>

              <button
                onClick={() => onToggleSave(post.id)}
                className={`flex items-center space-x-1 transition-colors ${
                  post.isSaved ? 'text-amber-600 font-bold' : 'hover:text-amber-600'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${post.isSaved ? 'fill-current' : ''}`} />
                <span className="hidden sm:inline">{post.isSaved ? 'Saved' : 'Save'}</span>
              </button>

            </div>

            {/* EXPANDED COMMENTS SECTION */}
            {expandedCommentPostId === post.id && (
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 animate-fade-in">
                <form onSubmit={(e) => handleCommentSubmit(post.id, e)} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={commentInput[post.id] || ''}
                    onChange={(e) => setCommentInput({ ...commentInput, [post.id]: e.target.value })}
                    placeholder="Write a supportive comment or question..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 flex items-center space-x-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Comment</span>
                  </button>
                </form>

                <div className="space-y-2 mt-3">
                  {post.comments.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No comments yet. Be the first to start the conversation!</p>
                  ) : (
                    post.comments.map((c) => (
                      <div key={c.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-slate-900">{c.authorName}</span>
                          <span className="text-[10px] text-slate-400">{c.timestamp}</span>
                        </div>
                        <p className="text-slate-700">{c.content}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </article>
        ))}
      </div>

      {/* CREATE POST MODAL */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-bold text-base text-slate-900">Create Community Post</h3>
              <button onClick={() => setCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePostSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
                <select
                  value={postCategory}
                  onChange={(e) => setPostCategory(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
                >
                  <option value="Career">Career Advice</option>
                  <option value="Jobs">Job Opportunity</option>
                  <option value="Internships">Internship Referral</option>
                  <option value="Projects">Project Showcase</option>
                  <option value="Achievements">Achievement</option>
                  <option value="Community">Community Question</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Headline / Title</label>
                <input
                  type="text"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="e.g. 🚀 Looking for referrals in Frontend / React roles..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Content Details</label>
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Share details about your project, career query, or referral opening..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={postTags}
                  onChange={(e) => setPostTags(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
