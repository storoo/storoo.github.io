// Test script for path resolution
import { resolvePath } from './lib/path-resolver.js';

console.log('=== Path Resolution Tests ===\n');

// Test cases
const testCases = [
  // Same page files
  { path: './files/project.pdf', page: 'research', expected: '/research/files/project.pdf' },
  { path: './files/notes.pdf', page: 'teaching', expected: '/teaching/files/notes.pdf' },
  
  // Cross-page files
  { path: './research/files/paper.pdf', page: 'teaching', expected: '/research/files/paper.pdf' },
  { path: './teaching/files/syllabus.pdf', page: 'research', expected: '/teaching/files/syllabus.pdf' },
  
  // External URLs
  { path: 'https://arxiv.org/abs/1234.5678', page: 'research', expected: 'https://arxiv.org/abs/1234.5678' },
  { path: 'mailto:test@example.com', page: 'home', expected: 'mailto:test@example.com' },
  
  // Absolute paths
  { path: '/profile.jpg', page: 'home', expected: '/profile.jpg' },
  
  // Hash links
  { path: '#section1', page: 'research', expected: '#section1' }
];

testCases.forEach(({ path, page, expected }, index) => {
  const result = resolvePath(path, page);
  const pass = result.href === expected;
  
  console.log(`Test ${index + 1}: ${pass ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  Input: "${path}" (page: ${page})`);
  console.log(`  Expected: "${expected}"`);
  console.log(`  Got: "${result.href}"`);
  console.log(`  External: ${result.isExternal}, File: ${result.isFile}\n`);
});

console.log('=== Test Complete ===');
