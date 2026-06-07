import JWTDecoder from '@/components/tools/JWTDecoder';

export const metadata = {
  title: 'JWT Decoder | Free Online Tool',
  description: 'Decode and verify JWT tokens',
};

export default function JWTDecoderPage() {
  return <JWTDecoder />;
}