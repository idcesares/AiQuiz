import styled from 'styled-components';
import { 
    FacebookShareButton,  
    FacebookIcon,
    LinkedinShareButton,
    LinkedinIcon,
    TwitterShareButton, 
    TwitterIcon
} from 'react-share';

const shareUrl = 'https://ai-quiz.idcesares.vercel.app/';
const title = 'AiQuiz - Um Quiz sobre Inteligência Artificial';

const SocialContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
`;

export default function SocialShare() {
    return (
        <SocialContainer>
            <FacebookShareButton
                url={shareUrl}
                quote={title}
                >
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            <LinkedinShareButton
                url={shareUrl}
                quote={title}
                >
                <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <TwitterShareButton
                url={shareUrl}
                quote={title}
                >
                <TwitterIcon size={32} round />
            </TwitterShareButton>
        </SocialContainer>
    )
    
}