/**
 * Path resolution utility for handling relative file paths in content
 */

export interface ResolvedPath {
  href: string;
  isExternal: boolean;
  isFile: boolean;
}

/**
 * Resolves relative paths based on the current page context
 * @param path - The path from the JSON content (e.g., "./research/files/project1.pdf")
 * @param currentPage - The current page context ("research", "teaching", "etc", or "home")
 * @returns Resolved path information
 */
export function resolvePath(path: string, currentPage: string): ResolvedPath {
  // Handle external URLs
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('mailto:')) {
    return {
      href: path,
      isExternal: true,
      isFile: false
    };
  }

  // Handle absolute paths (starting with /)
  if (path.startsWith('/')) {
    return {
      href: path,
      isExternal: false,
      isFile: isFilePath(path)
    };
  }

  // Handle relative paths (starting with ./)
  if (path.startsWith('./')) {
    const relativePath = path.substring(2); // Remove "./"
    
    // If it starts with a page name, use it as is
    if (relativePath.startsWith('research/') || 
        relativePath.startsWith('teaching/') || 
        relativePath.startsWith('etc/')) {
      return {
        href: `/${relativePath}`,
        isExternal: false,
        isFile: isFilePath(relativePath)
      };
    }
    
    // Otherwise, resolve relative to current page
    const resolvedPath = `/${currentPage}/${relativePath}`;
    return {
      href: resolvedPath,
      isExternal: false,
      isFile: isFilePath(relativePath)
    };
  }

  // Handle hash links and other special cases
  if (path.startsWith('#')) {
    return {
      href: path,
      isExternal: false,
      isFile: false
    };
  }

  // Default: treat as relative to current page
  const resolvedPath = `/${currentPage}/${path}`;
  return {
    href: resolvedPath,
    isExternal: false,
    isFile: isFilePath(path)
  };
}

/**
 * Determines if a path points to a file based on its extension
 */
function isFilePath(path: string): boolean {
  const fileExtensions = [
    '.pdf', '.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx',
    '.txt', '.md', '.tex', '.bib', '.zip', '.tar', '.gz',
    '.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp',
    '.mp4', '.mp3', '.wav', '.avi', '.mov'
  ];
  
  const lowercasePath = path.toLowerCase();
  return fileExtensions.some(ext => lowercasePath.endsWith(ext));
}

/**
 * Get the file type icon class based on file extension
 */
export function getFileTypeIcon(path: string): string {
  const extension = path.toLowerCase().split('.').pop();
  
  switch (extension) {
    case 'pdf':
      return 'file-pdf';
    case 'doc':
    case 'docx':
      return 'file-word';
    case 'ppt':
    case 'pptx':
      return 'file-powerpoint';
    case 'xls':
    case 'xlsx':
      return 'file-excel';
    case 'txt':
    case 'md':
      return 'file-text';
    case 'tex':
    case 'bib':
      return 'file-code';
    case 'zip':
    case 'tar':
    case 'gz':
      return 'file-archive';
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'svg':
    case 'webp':
      return 'file-image';
    case 'mp4':
    case 'avi':
    case 'mov':
      return 'file-video';
    case 'mp3':
    case 'wav':
      return 'file-audio';
    default:
      return 'file';
  }
}

/**
 * Enhanced link resolver that can be used in RichContent component
 */
export function createLinkResolver(currentPage: string) {
  return (url: string, title?: string) => {
    const resolved = resolvePath(url, currentPage);
    
    // Add appropriate attributes for different link types
    const attributes: Record<string, string> = {
      href: resolved.href
    };

    if (resolved.isExternal) {
      attributes.target = '_blank';
      attributes.rel = 'noopener noreferrer';
    }

    if (resolved.isFile) {
      attributes.download = ''; // Suggest download for file links
    }

    return {
      href: resolved.href,
      title: title || undefined,
      attributes
    };
  };
}
