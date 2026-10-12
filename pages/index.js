import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [posts, setPosts] = useState([])
    const [uploading, setUploading] = useState(false)

      useEffect(() => {
          fetchPosts()
            }, [])

              async function fetchPosts() {
                  const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false })
                      setPosts(data || [])
                        }

                          async function handleUpload(e) {
                              const file = e.target.files[0]
                                  if (!file) return
                                      setUploading(true)

                                          const fileName = `${Date.now()}_${file.name}`
                                              const { data, error } = await supabase.storage.from('posts').upload(fileName, file)

                                                  if (data) {
                                                        const { data: publicUrlData } = supabase.storage.from('posts').getPublicUrl(fileName)
                                                              await supabase.from('posts').insert([{ image_url: publicUrlData.publicUrl, caption: 'InstaCraze Post' }])
                                                                    fetchPosts()
                                                                        }
                                                                            setUploading(false)
                                                                              }

                                                                                return (
                                                                                    <div className="max-w-md mx-auto min-h-screen bg-black text-white p-4 pb-20">
                                                                                          <header className="border-b border-gray-800 pb-3 mb-4 flex justify-between items-center">
                                                                                                  <h1 className="text-2xl font-bold tracking-wider">InstaCraze</h1>
                                                                                                          <label className="bg-blue-600 px-3 py-1 rounded-lg text-sm font-semibold cursor-pointer">
                                                                                                                    {uploading ? 'Uploading...' : '+ Post'}
                                                                                                                              <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} />
                                                                                                                                      </label>
                                                                                                                                            </header>

                                                                                                                                                  <div className="space-y-6">
                                                                                                                                                          {posts.map((post) => (
                                                                                                                                                                    <div key={post.id} className="border border-gray-800 rounded-xl overflow-hidden bg-zinc-900">
                                                                                                                                                                                <img src={post.image_url} alt="Post" className="w-full aspect-square object-cover" />
                                                                                                                                                                                            <div className="p-3">
                                                                                                                                                                                                          <p className="text-sm">{post.caption}</p>
                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                        ))}
                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                    )
                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                    