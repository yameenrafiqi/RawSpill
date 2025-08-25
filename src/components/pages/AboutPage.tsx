import React from 'react';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';
import { authorInfo } from '../../data/dummyData';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About the Author
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get to know the person behind the articles and insights shared on RAWSPILL.
          </p>
        </div>

        {/* Author Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <img 
                src={authorInfo.avatar} 
                alt={authorInfo.name}
                className="w-48 h-48 rounded-full object-cover border-4 border-blue-100"
              />
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {authorInfo.name}
              </h2>
              
              <div className="prose prose-lg max-w-none text-gray-600 mb-8">
                <p>{authorInfo.bio}</p>
              </div>
              <div><p className='mb-4'>{authorInfo.address}</p></div>

              {/* Social Links */}
              <div className="flex justify-center md:justify-start gap-4 mb-8">
                {authorInfo.socialLinks.twitter && (
                  <a 
                    href={authorInfo.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-50 text-blue-400 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    <Twitter size={20} />
                  </a>
                )}
                {authorInfo.socialLinks.linkedin && (
                  <a 
                    href={authorInfo.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    <Linkedin size={20} />
                  </a>
                )}
                {authorInfo.socialLinks.github && (
                  <a 
                    href={authorInfo.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-50 text-gray-700 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    <Github size={20} />
                  </a>
                )}
                <button 
                  onClick={() => onNavigate('contact')}
                  className="p-3 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                >
                  <Mail size={20} />
                </button>
              </div>

              {/* CTA */}
              <button
                onClick={() => onNavigate('contact')}
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
