import Layout from '@components/layouts/PageLayout';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';

const questTypes = [
  'mobkill',
  'projectilekill',
  'donate',
  'shear',
  'tame',
  'milkcow',
  'craftitem',
  'consumeitem',
  'enchantitem',
  'money',
  'catchfish',
  'playerkill',
  'blockbreak',
  'blockplace',
];
export default function QuestCreationForm() {
  return (
    <Layout
      description="Randomly Generated Hytale Server Ideas with ChatGPT"
      title="Chat GPT Hytale Server Idea Generator"
    >
      <h1 className="pt-1 pb-2">Quest Creation Form</h1>
      <Input label={'QuestId'} placeholder={''} />
      <Input label={'Display name'} placeholder={''} />
      <div className="my-2">
        <label className="block text-xs pb-1">Quest Type</label>
        <select className="p-1 h-8 rounded-md border border-slate-400">
          {questTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <Input label={'Objective'} type="number" placeholder={''} width="w-16" />
      <Input label={'Duration'} type="text" placeholder={''} width="w-32" />
    </Layout>
  );
}

const Input = ({ label, placeholder, width = 'w-48', type = 'text' }) => {
  return (
    <div className={`my-2 text-sm`}>
      <label className="block text-xs pb-1">{label}</label>
      <input
        placeholder={placeholder}
        type={type}
        className={`${width} px-1 py-3 h-8 rounded-md border border-slate-400 focus-visible:outline-none focus:border-blue-400`}
      />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      {
        params: {
          category: 'portfolio',
        },
      },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async () => {
  const lastUpdated = new Date().toLocaleDateString();
  return {
    props: { lastUpdated },
  };
};
