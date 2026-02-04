'use client';

import { createClient } from '@/lib/supabase/client';
import { useEditorStore } from '@/store/editorStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Plus, Layout, Trash2, Edit2, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Project {
  id: string;
  name: string;
  updated_at: string;
  pages: any[];
}

export default function MyTemplatesPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const { setComponents, components, setPages, resetToDefault, setCurrentProjectId } = useEditorStore();

  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);
      fetchProjects();
    }
    getUser();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('id, name, updated_at, pages')
      .order('updated_at', { ascending: false });
    
    if (data) setProjects(data);
    setLoading(false);
  };

  const createNewProject = () => {
    resetToDefault();
    router.push('/editor');
  };

  const openProject = async (id: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('pages')
      .eq('id', id)
      .single();

    if (data && data.pages) {
      const pagesData = data.pages as any;
      
      resetToDefault();
      
      // pagesData is the full pages array from the database
      if (Array.isArray(pagesData) && pagesData.length > 0) {
         setPages(pagesData);
      }
      
      setCurrentProjectId(id);
      
      // Navigate
      router.push('/editor');
    }
    setLoading(false);
  };

  const deleteProject = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this template?')) return;

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (!error) {
       setProjects(projects.filter(p => p.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050510] flex items-center justify-center text-white">
        <Loader2 className="animate-spin mr-2" /> Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050510] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                 <Link href="/" className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                    <ArrowLeft size={24} />
                 </Link>
                <div>
                    <h1 className="text-3xl font-bold">My Templates</h1>
                    <p className="text-gray-400">Manage your saved designs</p>
                </div>
            </div>
            <button 
                onClick={createNewProject}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold flex items-center gap-2 transition-colors"
            >
                <Plus size={20} /> Create New
            </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
           {/* Create New Card */}
           <div 
             onClick={createNewProject}
             className="aspect-square border-2 border-dashed border-gray-700 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 hover:bg-white/5 transition-all group"
           >
              <div className="p-4 bg-gray-800 rounded-full mb-4 group-hover:bg-purple-600 transition-colors">
                <Plus size={32} className="text-gray-400 group-hover:text-white" />
              </div>
              <span className="text-lg font-medium text-gray-400 group-hover:text-white">Start Blank</span>
           </div>

           {projects.map(project => {
             // Get first page for preview
             const firstPage = project.pages && project.pages.length > 0 ? project.pages[0] : null;
             const hasComponents = firstPage && firstPage.components && firstPage.components.length > 0;
             
             return (
             <div 
                key={project.id}
                onClick={() => openProject(project.id)}
                className="bg-[#12121f] border border-gray-800 rounded-xl overflow-hidden hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all cursor-pointer group flex flex-col"
             >
                <div className="flex-1 bg-white relative overflow-hidden min-h-[200px]">
                    {hasComponents ? (
                      <div className="absolute inset-0 scale-[0.15] origin-top-left" style={{ width: '1440px', height: `${firstPage.canvasHeight || 1200}px` }}>
                        {firstPage.components.map((comp: any) => (
                          <div
                            key={comp.id}
                            style={{
                              position: 'absolute',
                              left: comp.styles.x,
                              top: comp.styles.y,
                              width: comp.styles.width,
                              height: comp.styles.height,
                              backgroundColor: comp.styles.backgroundColor,
                              color: comp.styles.textColor,
                              fontSize: comp.styles.fontSize,
                              borderRadius: comp.styles.borderRadius,
                              overflow: 'hidden',
                              display: 'flex',
                              alignItems: comp.type === 'button' ? 'center' : 'flex-start',
                              justifyContent: comp.type === 'button' ? 'center' : comp.styles.textAlign === 'center' ? 'center' : 'flex-start',
                              padding: comp.styles.padding,
                            }}
                          >
                            {comp.type === 'image' && comp.src ? (
                              <img src={comp.src} alt="" className="w-full h-full object-cover" />
                            ) : comp.type === 'text' || comp.type === 'button' ? (
                              <span style={{ fontSize: comp.styles.fontSize, fontWeight: comp.styles.fontWeight }}>
                                {comp.content}
                              </span>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
                        <Layout size={48} className="text-gray-700 group-hover:text-purple-500 transition-colors" />
                      </div>
                    )}
                    
                    {/* Overlay Actions */}
                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                         <button 
                            onClick={(e) => deleteProject(project.id, e)}
                            className="p-2 bg-red-500/20 backdrop-blur-sm text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                            title="Delete"
                        >
                            <Trash2 size={16} />
                         </button>
                    </div>
                </div>
                <div className="p-4 border-t border-gray-800 bg-[#12121f]">
                    <h3 className="font-semibold text-white truncate">{project.name}</h3>
                    <p className="text-gray-500 text-xs mt-1">
                        Updated {new Date(project.updated_at).toLocaleDateString()}
                    </p>
                </div>
             </div>
           )})}

        </div>

        {projects.length === 0 && (
           <div className="text-center py-12 text-gray-500">
              You haven't saved any templates yet.
           </div>
        )}
      </div>
    </div>
  );
}
