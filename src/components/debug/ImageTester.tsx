import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SimpleImage } from '@/components/ui/simple-image'
import { ImageExamples } from '@/utils/image-examples.utils'

/** Componente para testing de imágenes - Solo para desarrollo */
export const ImageTester = () => {
  const [currentUrl, setCurrentUrl] = useState('')
  const examples = ImageExamples.getExampleUrls()

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>🧪 Testing de Imágenes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {examples.map((example, index) => (
            <div key={index} className="space-y-2">
              <Button
                onClick={() => setCurrentUrl(example.url)}
                variant="outline"
                size="sm"
                className="w-full text-left justify-start"
              >
                {example.name}
              </Button>
              <p className="text-xs text-gray-600">{example.description}</p>
            </div>
          ))}
        </div>
        
        {currentUrl && (
          <div className="space-y-4 pt-4 border-t">
            <div>
              <h3 className="font-semibold mb-2">URL Actual:</h3>
              <div className="bg-gray-100 p-2 rounded text-sm font-mono break-all">
                {currentUrl}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Vista Previa:</h3>
              <div className="w-full h-64 border rounded-lg overflow-hidden">
                <SimpleImage
                  src={currentUrl}
                  alt="Imagen de prueba"
                  className=""
                  fallbackTitle="Test Image"
                />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
